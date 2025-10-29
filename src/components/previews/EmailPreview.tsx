import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as styles from '../../styles/components/campaigns/EmailPreview.styles';
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
    <styles.EmailContainer>
      <styles.EmailHeader>
        <styles.EmailInfoRow>
          <styles.FieldLabel variant="caption">
            Para
          </styles.FieldLabel>
          <styles.RecipientChip 
            label="soporte@vcaperu.com" 
            size="small" 
          />
        </styles.EmailInfoRow>

        <styles.EmailCCRow>
          <styles.FieldLabel variant="caption">
            CC
          </styles.FieldLabel>
          <styles.CCChip 
            label="nirvana@laraigo.com" 
            size="small" 
            variant="outlined"
          />
          <styles.CCChip 
            label="tulio@laraigo.com" 
            size="small" 
            variant="outlined"
          />
        </styles.EmailCCRow>
        
        <styles.EmailCCORow>
          <styles.FieldLabel variant="caption">
            CCO
          </styles.FieldLabel>
          <styles.CCChip 
            label="soporte@laraigo.com" 
            size="small" 
            variant="outlined"
          />
        </styles.EmailCCORow>

        <styles.SubjectRow>
          <styles.FieldLabel variant="caption">
            Asunto
          </styles.FieldLabel>
          <styles.SubjectText variant="body1">
            {plantilla.nombre}
          </styles.SubjectText>
        </styles.SubjectRow>
      </styles.EmailHeader>

      <styles.EmailContent>
        {plantilla.tipo === 'HTML' ? (
          <iframe
            ref={iframeRef}
            title={`preview-${plantilla.id}`}
            srcDoc={srcDoc}
            sandbox="allow-same-origin allow-scripts"
            style={{
              ...styles.EmailIframe,
              height: `${height}px`,
            }}
          />
        ) : (
          <styles.TextContent>
            <styles.PlainTextContent component="pre">
              {plantilla.preview || plantilla.contenido}
            </styles.PlainTextContent>
          </styles.TextContent>
        )}
      </styles.EmailContent>
    </styles.EmailContainer>
  );
};