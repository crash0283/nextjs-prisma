import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {useState} from "react"

import prisma from "../lib/prisma"

// import { getSortedPostsData } from "../lib/posts"

export const getStaticProps = async () => {
  const allEmps = await prisma.employees.findMany()
  return {
    props: {
      allEmps
    },
    revalidate: 1
  }
}

export default function Home({ allEmps }) {
  const [name,setName] = useState("")
  const [gender,setGender] = useState("")
  const [contactNumber,setContactNumber] = useState("")
  const [salary,setSalary] = useState("")
  const [yearsInCompany,setYearsInCompany] = useState("")


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
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Name"/><br />
        <input type="text" onChange={(e) => setGender(e.target.value)} value={gender} placeholder="Enter Gender"/><br />
        <input type="text" onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} placeholder="Enter Contact Number"/><br />
        <input type="text" onChange={(e) => setSalary(e.target.value)} value={salary} placeholder="Enter Salary"/><br />
        <input type="text" onChange={(e) => setYearsInCompany(e.target.value)} value={yearsInCompany} placeholder="Enter Years In Company"/><br />
        <input type="submit" value="Create Employee"/>
      </form>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Employees</h2>
        <ul className={utilStyles.list}>
          {allEmps.map(({ id, em_name }) => (

            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {em_name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
