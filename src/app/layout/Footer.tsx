import { Box, Container, Link, Typography } from '@mui/material';

export function Footer() {
  return (
    <Container component="footer" maxWidth="xl" sx={{ position: 'relative', py: 4 }}>
      <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Tools Workshop runs entirely in your browser. Source is intended for GitHub Pages at{' '}
          <Link href="https://pankaj28843.github.io/tools/" color="inherit">
            /tools/
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
}
