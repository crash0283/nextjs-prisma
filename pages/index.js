import Head from 'next/head'
import Link from "next/link"
import { useRouter } from "next/router"
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import Employee from "../models/employee.js"
import connectDB from "../lib/connect/connect"


export const getStaticProps = async () => {
  await connectDB()

  const allEmps = await Employee.find({})

  return {
    props: {
      allEmps: JSON.parse(JSON.stringify(allEmps))
    }
  }
}

export default function Home({ allEmps }) {
  const router = useRouter()

  const deletePost = async (_id) => {
    console.log(_id)
    await fetch(`http://localhost:3000/api/delete/${_id}`, {
      method: 'DELETE',
    })
    router.push('/')
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href="/createEmployee"><button>Create Employee</button></Link>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Employees</h2>
        <ul className={utilStyles.list}>
          {allEmps.map(({ _id, em_name }) => (

            <li className={utilStyles.listItem} key={_id}>
              <Link href={`/posts/${_id}`}>
                {em_name}
              </Link>
              {" "}
              <button onClick={() => deletePost(_id)}>X</button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
