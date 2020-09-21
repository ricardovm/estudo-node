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
                    res.status(201).json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento