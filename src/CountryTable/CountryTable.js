import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Header } from '../Header'
import { Loading } from '../Loading'

const QUERY = gql`
  query {
    countries {
      name
      currency
      emoji
      languages {
        name
      }
    }
  }
`

export const CountryTable = () => {
  const { loading, data } = useQuery(QUERY)
  //loading = true
  return (
    <article className='container'>
      <Header title={'Countries'} />
      {loading && <Loading />}
      {data && !loading &&
        <table className='table'>
          <thead>
            <tr>
              <th>Country</th>
              <th>Currency</th>
              <th>Languages</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {data.countries.map((country, i) => {
              const { name, currency, languages, emoji } = country
              return (
                <tr key={i}>
                  <td>{name}</td>
                  <td>{currency}</td>
                  <td>{languages.map(l => `${l.name}`).join(', ')}</td>
                  <td>{emoji}</td>
                </tr>
              )
            })}
            }
          </tbody>
        </table>
      
      }
    </article>
  )
}
