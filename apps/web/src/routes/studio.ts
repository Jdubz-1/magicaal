import { Router } from 'express';
import { requireSession } from '../middleware/session';
import { layout, escHtml } from '../views/layout';

export const studioRouter = Router();

studioRouter.use(requireSession);

studioRouter.get('/:agentId', (req, res) => {
  const { agentId } = req.params;
  const user = req.session!;
  res.send(
    layout(
      `<div id="canvas-mount" data-agent-id="${escHtml(agentId)}"></div>`,
      {
        title: 'Studio — MagiCaal',
        withCanvas: true,
        user: { name: user.userId, role: user.role },
      },
    ),
  );
});
