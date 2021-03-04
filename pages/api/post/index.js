import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  
    const { name, gender, contactNumber, salary, yearsInCompany } = req.body

    const result = await prisma.employees.create({
        data: {
          em_name: name,
          gender: gender,
          contact_number: contactNumber,
          salary: parseFloat(salary),
          years_in_company: parseInt(yearsInCompany)
        },
      })
      res.json(result)
  }
  