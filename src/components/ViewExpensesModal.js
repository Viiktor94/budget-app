import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetContext"


export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetsExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const expenses = getBudgetsExpenses(budgetId)
    const budget = 
        UNCATEGORIZED_BUDGET_ID === budgetId 
            ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID } 
            : budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            
                <Modal.Header closeButton>
                    <Stack direction="horizontal" gap="2">
                        <div>Gastos- {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }} variant="outline-danger">Borrar</Button>
                        )}
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                   <Stack direction="vertical" gap="3">
                       {expenses.map(expense => (
                           <Stack direction="horizontal" gap="2" key={expense.id}>
                               <div className="me-auto fs-4" >{expense.description}</div>
                               <div className="fs-5">${expense.amount}</div>
                               <Button onClick={() => deleteExpense(expense)} 
                               size="sm" 
                               variant="outline-danger">
                                   &times;
                                </Button>
                           </Stack>
                       ))}
                   </Stack>
                </Modal.Body>
           
        </Modal>
    )
}