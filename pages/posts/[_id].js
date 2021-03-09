import Layout from '../../components/layout'
import Head from "next/head"

import utilStyles from '../../styles/utils.module.css'

import Employee from "../../models/employee.js"
import connectDB from "../../lib/connect/connect"

export async function getStaticPaths() {
    await connectDB()
    const newPaths = await Employee.find({})
    const paths = newPaths.map((item) => {
            let _id = JSON.parse(JSON.stringify(item._id))
            return { params: { _id } }
        })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    await connectDB()
    const data = await Employee.findById(params._id)
    const newData = (JSON.parse(JSON.stringify(data)))
    return {
        props: {
            data: newData
        },
        revalidate: 1
    }
}


export default function Post({ data }) {
    return (
        <Layout>
            <Head>
                <title>{data.em_name}</title>
            </Head>
            <article>
                <button>Update Employee</button>
                <h1 className={utilStyles.headingXl}>Name: {data.em_name}</h1>
                <br />
                Employee ID: {data._id}
                <br />
            Gender: {data.gender}
                <br />
            Contact Number: {data.contact_number}
                <br />
            Salary: {data.salary}
                <br />
            Years At Company: {data.years_in_company}
                <br />
                <br />
                <div className={utilStyles.lightText}>
                    Created on {data.dateCreated}
                </div>
            </article>

        </Layout>
    )
}