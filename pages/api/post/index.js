import Employee from "../../../models/employee"

export default async function handler(req, res) {

  const { name, gender, contactNumber, salary, yearsInCompany } = req.body

  const user = new Employee({
    em_name: name,
    gender: gender,
    salary: salary,
    contact_number: contactNumber,
    years_in_company: yearsInCompany
  })
  // Create new user
  const usercreated = await user.save()

  return res.status(200).send(usercreated)
}
  