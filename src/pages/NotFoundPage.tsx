import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="h2" component="h1">
            This bench is empty.
          </Typography>
          <Typography color="text.secondary">The tool route does not exist yet.</Typography>
          <Button component={RouterLink} to="/" variant="contained">
            Return to tools
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
