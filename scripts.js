const Modal = {
    open() {
        // Abre modal
        // Adiciona a lista de classe do seletor modal overlay que está no documento
        document.querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        // Fecha o modal
        // Remove a class active do modal
        document.querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50001,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20012,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
]

const Transaction = {
    //soma as entradas
    incomes() {
        let income = 0;
        //pega todas as transacoes
        //para cada transacao,
        transactions.forEach((transaction) => {
            //se ela for maior que zero
            if (transaction.amount > 0) {
                //soma a uma variavel e retorna a variavel
                income += transaction.amount;
            }
        })
        return income
    },
    expenses() {
        // soma as saídas
        let expense = 0;
        transactions.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense
    },
    total() {
        //entradas - saídas
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="/assets/assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
