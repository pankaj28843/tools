import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { tools } from '../tools/registry';

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'grid', minHeight: 360, placeItems: 'center' }}>
          <CircularProgress aria-label="Loading tool" />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        {tools.map((tool) => {
          const ToolComponent = tool.Component;
          return <Route key={tool.slug} path={`/${tool.slug}`} element={<ToolComponent />} />;
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
