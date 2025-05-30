import { EmployeeUseCases } from '@application/employee/employe.usecases';
import { Request, Response } from 'express';

export class EmployeeController {
    constructor(private employeeUseCase: EmployeeUseCases) { }

    public getEmployeeByDocument = async (req: Request, res: Response) => {
        const { documento } = req.params;

        if (!documento || typeof documento !== 'string') {
            res.status(400).json({ message: 'Document is required' })
            return
        }

        try {
            const employess = await this.employeeUseCase.findByDocument(documento)
            res.status(200).json(employess)
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all employees' })
        }
    }

    public getAllEmployees = async (req: Request, res: Response) => {
        try {
            const employees = await this.employeeUseCase.findAll()
            res.status(200).json(employees)
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all employees' })
        }
    }

}