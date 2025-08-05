import { Card, CardBody, CardHeader } from '@heroui/react'
import { AuthLayout } from '../../../components/layout/AuthLayout'

export const LoginPage = () => {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center w-full">Sign In</h1>
        </CardHeader>
        <CardBody>
          <p className="text-center text-default-600">
            Login form will be implemented in Phase 2
          </p>
        </CardBody>
      </Card>
    </AuthLayout>
  )
}