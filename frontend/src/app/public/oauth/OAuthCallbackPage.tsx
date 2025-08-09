import { Spinner } from '@heroui/react'

export const OAuthCallbackPage = () => {
  return (
    <div className="text-center space-y-4">
        <Spinner size="lg" color="primary" />
        <p className="text-default-600">Processing OAuth callback...</p>
    </div>
  )
}