import Layout from '../../components/layout'
import Head from "next/head"

import utilStyles from '../../styles/utils.module.css'

import prisma from "../../lib/prisma"

export async function getStaticPaths() {
    const paths = await prisma.employees.findMany({ select: { id: true } })
    const newPaths = paths.map((item) => {
        let myVal = item.id.toString()
        return { params: { id: myVal } }
    })
    return {
        paths: newPaths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const data = await prisma.employees.findMany({ where: { id: Number(params.id) } })
    return {
        props: {
            data
        }
    }
}


export default function Post({ data }) {
    return (
        <Layout>
            <Head>
                <title>{data[0].em_name}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>Name: {data[0].em_name}</h1>
                <br />
                Employee ID: {data[0].id}
                <br />
            Gender: {data[0].gender}
                <br />
            Contact Number: {data[0].contact_number}
                <br />
            Salary: {data[0].salary}
                <br />
            Years At Company: {data[0].years_in_company}
                <br />
                <br />
                <div className={utilStyles.lightText}>
                    Created on {data[0].date_created.toString()}
                </div>
            </article>
           
        </Layout>
    )
}