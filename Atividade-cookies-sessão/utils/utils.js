const Joi = require("joi");

const taskSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    nome: Joi.string()
        .min(3)
        .max(30)
        .required(),
    prioridade: Joi.string()
        .valid("Baixa", "Média", "Alta")
        .required()
}).with("id", "nome");

function getPriorities(selectedPriority) {
    const priorities = ["Baixa", "Média", "Alta"];
    return priorities.map((priority) => ({
        value: priority,
        isSelected: priority === selectedPriority
    }));
}

function getPriorityColor(priority) {
    switch (priority) {
        case "Baixa":
            return "green";
        case "Média":
            return "yellow";
        case "Alta":
            return "red";
        default:
            return "black";
    }
}


let userCounters = [];

let allTasks = [];


module.exports = {
    taskSchema,
    getPriorities,
    getPriorityColor,
    userCounters,
    allTasks
};
