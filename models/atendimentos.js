const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')

const conexao = require('../infra/conexao')

class Atendimento {

    adicionar(atendimento, res) {
        dayjs.extend(customParseFormat)
        dayjs.extend(isSameOrAfter)

        const dataCriacao = dayjs().format('YYYY-MM-DD HH:mm:ss')
        const data = dayjs(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataValida = dayjs(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 5

        const validacao = [
            { nome: 'cliente', valido: clienteValido, mensagem: 'Cliente deve ter pelo menos 5 caracteres' },
            { nome: 'data', valido: dataValida, mensagem: 'Data deve ser maior ou igual à data atual' }
        ]

        const erros = validacao.filter(campo => !campo.valido)

        if (erros.length) {
            res.status(400).json(erros)
        } else {
            const atendimentoGravacao = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoGravacao, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json({ id: resultados.insertId, ...atendimento })
                }
            })
        }
    }

    alterar(id, valores, res) {
        if (valores.data) {
            dayjs.extend(customParseFormat)
            valores.data = dayjs(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id, ...valores })
            }
        })
    }

    excluir(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }

    listar(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    carregarPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const [atendimento] = resultados
                res.status(200).json(atendimento)
            }
        })
    }
}

module.exports = new Atendimento