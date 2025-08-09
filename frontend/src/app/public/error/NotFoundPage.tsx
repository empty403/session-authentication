import { Button, Card, CardBody, Link } from "@heroui/react";
import { MapPin } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardBody className="flex flex-col items-center justify-center py-12 px-8">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-warning-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-warning-400 to-orange-500 rounded-full blur opacity-20"></div>
        </div>

        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold text-default-900">
            Page Not Found
          </h1>
          <p className="text-default-600 text-sm max-w-sm leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="w-full space-y-3">
          <Button
            as={Link}
            href="/"
            color="primary"
            size="md"
            className="w-full font-medium"
          >
            Go Home
          </Button>

          <Button
            onPress={() => window.history.back()}
            variant="ghost"
            color="default"
            size="md"
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
