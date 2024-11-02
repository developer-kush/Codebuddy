const createError = require('http-errors')
const { makeHintRequest } = require('./gemini')

const problems = require('./problems')

var ctls = {

    getAllProblems: async (req, res) => {
        try {
            res.send(Object.keys(problems).map(key => ({ problem_id: key, name: problems[key].name })))
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },

    getProblem: async (req, res) => {
        try {
            const problem_id = req.params.problem_id
            if (!problem_id) throw new Error("Problem ID is required")
            if (!problems[problem_id]) throw new Error("Problem not found")
            res.send(problems[problem_id])
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    },

    getHint: async (req, res) => {
        const { problem_id, code, history } = req.body
        
        try {
            if (!problem_id) throw new Error("Problem ID is required")
            if (!problems[problem_id]) throw new Error("Problem not found")
            
            // console.log('Hint Requested:')
            // console.log('Problem:', problems[problem_id])
            // console.log('History:', history)
            // console.log('Code:', code)
            res.send({
                // hint: "Hint Responded"
                hint: await makeHintRequest(problems[problem_id], history, code)
            })
        } catch (error) {
            console.log('Error:', error.message)
            res.status(500).send({ error: error.message })
        }
    }
    
}

module.exports = ctls