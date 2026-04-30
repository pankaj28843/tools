import { Box, Container, Link, Typography } from '@mui/material';

export function Footer() {
  return (
    <Container component="footer" maxWidth="lg" sx={{ position: 'relative', py: 2 }}>
      <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Runs locally in your browser. Source lives at{' '}
          <Link href="https://pankaj28843.github.io/tools/" color="inherit">
            /tools/
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
}
