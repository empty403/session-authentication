import { Spinner } from '@heroui/react'
import { AuthLayout } from '../../../components/layout/AuthLayout'

export const OAuthCallbackPage = () => {
  return (
    <AuthLayout>
      <div className="text-center space-y-4">
        <Spinner size="lg" color="primary" />
        <p className="text-default-600">Processing OAuth callback...</p>
      </div>
    </AuthLayout>
  )
}