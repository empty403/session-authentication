import { Card, CardBody, CardHeader } from '@heroui/react'
import { AuthLayout } from '../../../components/layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center w-full">Create Account</h1>
        </CardHeader>
        <CardBody>
          <p className="text-center text-default-600">
            Register form will be implemented in Phase 2
          </p>
        </CardBody>
      </Card>
    </AuthLayout>
  )
}