import { useState } from "react"
import {useRouter} from "next/router"

import Layout from "../components/layout"

export default function createEmployee() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [salary, setSalary] = useState("")
    const [yearsInCompany, setYearsInCompany] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = { name, gender, contactNumber, salary, yearsInCompany }

            await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            setName("")
            setGender("")
            setSalary("")
            setContactNumber("")
            setYearsInCompany("")
            router.push("/")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name" /><br />
                <input type="text" onChange={(e) => setGender(e.target.value)} value={gender} placeholder="Enter Gender" /><br />
                <input type="text" onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} placeholder="Enter Contact Number" /><br />
                <input type="text" onChange={(e) => setSalary(e.target.value)} value={salary} placeholder="Enter Salary" /><br />
                <input type="text" onChange={(e) => setYearsInCompany(e.target.value)} value={yearsInCompany} placeholder="Enter Years In Company" /><br />
                <button>Create Employee</button>
            </form>
        </Layout>
    )
}