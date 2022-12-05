import { useSession, signOut } from 'next-auth/react'

const Dashboard = () => {
  const { data } = useSession({ required: true })

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
      <div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
