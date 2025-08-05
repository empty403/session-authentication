import { Button, Card, CardBody } from '@heroui/react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'

export const ServerErrorPage = () => {
  return (
    <AuthLayout>
      <Card>
        <CardBody className="text-center space-y-6 p-8">
          <h1 className="text-6xl font-bold text-danger">500</h1>
          <h2 className="text-2xl font-semibold">Server Error</h2>
          <p className="text-default-600">
            Something went wrong on our end. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.reload()} color="primary">
              Try Again
            </Button>
            <Button as={Link} to="/" variant="bordered">
              Go Home
            </Button>
          </div>
        </CardBody>
      </Card>
    </AuthLayout>
  )
}