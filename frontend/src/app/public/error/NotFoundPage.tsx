import { Button, Card, CardBody } from '@heroui/react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../../components/layout/AuthLayout'

export const NotFoundPage = () => {
  return (
    <AuthLayout>
      <Card>
        <CardBody className="text-center space-y-6 p-8">
          <h1 className="text-6xl font-bold text-danger">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-default-600">
            The page you're looking for doesn't exist.
          </p>
          <Button as={Link} to="/" color="primary">
            Go Home
          </Button>
        </CardBody>
      </Card>
    </AuthLayout>
  )
}