import { useSession, signOut } from 'next-auth/react'

const Dashboard = () => {
  useSession({ required: true })

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
