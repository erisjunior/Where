import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data: user } = useSession()

  return (
    <main>
      {!user && <p>Loading</p>}
      <h2>Dashboard</h2>
    </main>
  )
}

export default Dashboard
