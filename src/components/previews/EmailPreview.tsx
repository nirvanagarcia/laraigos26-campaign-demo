import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import type { PlantillaComunicacion } from '../../types/mockData';

interface EmailPreviewProps {
  plantilla: PlantillaComunicacion;
}

const sanitize = (html: string) => html;

const buildSrcDoc = (id: string, html: string) => `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin:0; padding:0; background:#fff; }
  * { box-sizing:border-box; }
</style>
</head>
<body>
  ${sanitize(html)}
  <script>
    const ID = '${id}';
    const send = (origin = 'load') => {
      const h = document.body.scrollHeight || document.documentElement.scrollHeight || 0;
      parent.postMessage({ __emailPreview: true, id: ID, height: h, origin }, '*');
    };
    window.addEventListener('load', () => send('window.load'));
    setTimeout(() => send('timeout200'), 200);
    setTimeout(() => send('timeout600'), 600);
    setTimeout(() => send('timeout1200'), 1200);
    const ro = new ResizeObserver(() => send('resizeObserver'));
    ro.observe(document.body);
  </script>
</body>
</html>`;

export const EmailPreview: React.FC<EmailPreviewProps> = ({ plantilla }) => {
  const [height, setHeight] = useState(300);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const srcDoc = useMemo(() => buildSrcDoc(String(plantilla.id), plantilla.contenido), [
    plantilla.id,
    plantilla.contenido,
  ]);

  useEffect(() => {
    if (plantilla.tipo !== 'HTML') return;

    const handler = (ev: MessageEvent) => {
      const data = ev.data as any;
      if (data?.__emailPreview && String(data.id) === String(plantilla.id)) {
        const h = Math.min(Math.max(data.height || 300, 150), 1500);
        setHeight(h);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [plantilla.id, plantilla.tipo]);

  return (
    <Box sx={{
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '10px',
      overflow: 'hidden',
      width: '100%',
    }}>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #e0e0e0', 
        bgcolor: '#fcfcfc',
        fontFamily: 'Roboto, sans-serif',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: '50px' }}>
            Para
          </Typography>
          <Chip 
            label="soporte@vcaperu.com" 
            size="small" 
            sx={{ bgcolor: '#eeeeee', color: '#333', fontSize: '0.8rem' }} 
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5, color: 'text.secondary' }}>
          <Typography variant="caption" sx={{ minWidth: '50px' }}>
            CC
          </Typography>
          <Chip 
            label="nirvana@laraigo.com" 
            size="small" 
            variant="outlined"
            sx={{ fontSize: '0.8rem' }} 
          />
          <Chip 
            label="tulio@laraigo.com" 
            size="small" 
            variant="outlined"
            sx={{ fontSize: '0.8rem' }} 
          />
        </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5, color: 'text.secondary' }}>
          <Typography variant="caption" sx={{ minWidth: '50px' }}>
            CCO
          </Typography>
          <Chip 
            label="soporte@laraigo.com" 
            size="small" 
            variant="outlined"
            sx={{ fontSize: '0.8rem' }} 
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'baseline', 
          gap: 1, 
          pt: 1.5, 
          borderTop: '1px solid #f0f0f0' 
        }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: '50px' }}>
            Asunto
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.4 }}>
            {plantilla.nombre}
          </Typography>
        </Box>
      </Box>

      {plantilla.tipo === 'HTML' ? (
        <iframe
          ref={iframeRef}
          title={`preview-${plantilla.id}`}
          srcDoc={srcDoc}
          sandbox="allow-same-origin allow-scripts"
          style={{
            width: '100%',
            height: `${height}px`,
            border: 'none',
            transition: 'height 0.2s ease',
          }}
        />
      ) : (
        <Box sx={{ p: 2, overflowY: 'auto', maxHeight: 500 }}>
          <Typography
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
              fontSize: '0.88rem',
              lineHeight: 1.7,
              color: '#222',
            }}
          >
            {plantilla.preview || plantilla.contenido}
          </Typography>
        </Box>
      )}
    </Box>
  );
};