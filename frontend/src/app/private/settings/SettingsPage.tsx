import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react'
import { AppLayout } from '../../../components/layout/AppLayout'
import { ProtectedRoute } from '../../../components/layout/ProtectedRoute'

export const SettingsPage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          
          <Tabs aria-label="Settings tabs" variant="underlined">
            <Tab key="personal" title="Personal Information">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600">
                    Personal information form will be implemented in Phase 3
                  </p>
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="security" title="Security">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600">
                    Security settings will be implemented in Phase 3
                  </p>
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="sessions" title="Active Sessions">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Active Sessions</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600">
                    Session management will be implemented in Phase 3
                  </p>
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="history" title="Login History">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Login History</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600">
                    Login history will be implemented in Phase 3
                  </p>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </AppLayout>
    </ProtectedRoute>
  )
}