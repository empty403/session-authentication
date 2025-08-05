import { Card, CardBody, CardHeader } from '@heroui/react'
import { AppLayout } from '../../../components/layout/AppLayout'
import { ProtectedRoute } from '../../../components/layout/ProtectedRoute'

export const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">Profile Dashboard</h1>
            </CardHeader>
            <CardBody>
              <p className="text-default-600">
                Profile dashboard will be implemented in Phase 3
              </p>
            </CardBody>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}