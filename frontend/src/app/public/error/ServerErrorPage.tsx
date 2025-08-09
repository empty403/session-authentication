import { Button, Card, CardBody, Link } from "@heroui/react";
import { AlertTriangle } from "lucide-react";

export const ServerErrorPage = () => {
  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardBody className="flex flex-col items-center justify-center py-12 px-8">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-danger-400 to-danger-500 rounded-full flex items-center justify-center shadow-md">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-danger-400 to-danger-500 rounded-full blur opacity-20"></div>
        </div>

        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold text-default-900">
            Something Went Wrong
          </h1>
          <p className="text-default-600 text-sm max-w-sm leading-relaxed">
            We're experiencing some technical difficulties. Please try again in
            a few moments.
          </p>
        </div>

        <div className="w-full space-y-3">
          <Button
            as={Link}
            href="/"
            color="primary"
            size="md"
            className="w-full"
          >
            Go Home
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
