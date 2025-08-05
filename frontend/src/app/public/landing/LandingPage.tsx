import { Button, Card, CardBody } from "@heroui/react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../../components/layout/AuthLayout";

export const LandingPage = () => {
  return (
    <AuthLayout>
      <Card>
        <CardBody className="text-center space-y-6 p-8">
          <h1 className="text-4xl font-bold">Welcome to SessionAuth</h1>
          <p className="text-lg text-default-600">
            A modern authentication system built with React 19 and HeroUI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} to="/login" color="primary" size="lg">
              Sign In
            </Button>
            <Button
              as={Link}
              to="/register"
              color="secondary"
              variant="bordered"
              size="lg"
            >
              Sign Up
            </Button>
          </div>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};
