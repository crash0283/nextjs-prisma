import Head from 'next/head'
import Link from "next/link"
import { useRouter } from "next/router"
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import prisma from "../lib/prisma"

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
  const router = useRouter()

  const deletePost = async (id) => {
    await fetch(`http://localhost:3000/api/delete/${id}`, {
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
          {allEmps.map(({ id, em_name }) => (

            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {em_name}
              </Link>
              {" "}
              <button onClick={() => deletePost(id)}>X</button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
