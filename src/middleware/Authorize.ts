import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const authorize = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.body;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userPermissions = user.permissions;
      const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));
      if (!hasPermission) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Caso tenha permissão, passa para o próximo middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
