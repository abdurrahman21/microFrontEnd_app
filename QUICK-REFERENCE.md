# Quick Reference - Microfrontend Commands

## 🚀 Start Development

### Start Host (Shell)
```bash
npm start
# or
npm run start:shell
```
**Port:** http://localhost:4200

### Start Individual Remotes

```bash
npm run start:product    # 4202
npm run start:order      # 4203
npm run start:cart       # 4204
npm run start:auth       # 4205
npm run start:dashboard  # 4201
```

### Start Everything at Once
```bash
npm run run:all
```

## 🔨 Build Commands

### Build Individual Apps
```bash
npm run build:shell
npm run build:product
npm run build:order
npm run build:cart
npm run build:auth
npm run build:dashboard
```

### Build All for Production
```bash
npm run build:all
```

## 📱 App Ports Quick Reference

| Command | Port | App |
|---------|------|-----|
| `npm start` | 4200 | Shell (Host) |
| `npm run start:dashboard` | 4201 | Dashboard Remote |
| `npm run start:product` | 4202 | Product Remote |
| `npm run start:order` | 4203 | Order Remote |
| `npm run start:cart` | 4204 | Cart Remote |
| `npm run start:auth` | 4205 | Auth Remote |

## 🔧 Configuration Files

### Angular Project Config
```
angular.json
```
Each project defined with:
- Builder: `ngx-build-plus:browser`
- Webpack configs: `webpack.config.js`, `webpack.prod.config.js`
- Ports and public hosts

### Module Federation Config
```
projects/[app]/webpack.config.js
```
Defines:
- Remote name
- Exposed components
- Shared dependencies

## 📚 Project Structure

```
projects/
├── shell/              ← Host application
├── dashboard/          ← Remote (existing)
├── product/            ← Remote (new)
├── order/              ← Remote (new)
├── cart/               ← Remote (new)
└── auth/               ← Remote (new)
```

## 🎯 Common Development Tasks

### Add New Route to Shell
Edit: `projects/shell/src/app/app.routes.ts`

```typescript
{
  path: 'product',
  loadComponent: () => import('product/Component').then(m => m.App)
}
```

### Add New Component to Remote
1. Create component in `projects/[app]/src/app/`
2. Update `webpack.config.js` exposes:
```javascript
exposes: {
  './Component': './projects/[app]/src/app/app.ts',
  './NewComponent': './projects/[app]/src/app/new.ts', // New
}
```

### Debug Module Federation
Check browser DevTools:
1. Network tab → look for `remoteEntry.js` requests
2. Console → look for federation module loading messages
3. Application tab → shared modules cache

## 📖 Documentation

- **Detailed Setup:** See `README-SETUP.md`
- **Summary:** See `SETUP-SUMMARY.md`
- **This File:** `QUICK-REFERENCE.md`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :4200

# Kill process (macOS)
kill -9 <PID>
```

### Module Not Found
- Ensure remote app is running on correct port
- Check `webpack.config.js` exposes path
- Clear browser cache

### CORS Issues
- All apps running on localhost (dev) - no CORS issues
- For production, adjust `publicHost` in `angular.json`

### Dependencies Not Updating
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔄 Common Workflows

### Development with Multiple Remotes

**Terminal 1:**
```bash
npm start
```

**Terminal 2:**
```bash
npm run start:product
```

**Terminal 3:**
```bash
npm run start:order
```

etc.

### Production Build & Deploy

```bash
# Build all
npm run build:all

# Output in:
# dist/shell/
# dist/product/
# dist/order/
# dist/cart/
# dist/auth/
# dist/dashboard/

# Deploy each folder to CDN or server
```

## 🎓 Learning Resources

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Angular Guide](https://angular.io/guide)
- [@angular-architects/module-federation](https://github.com/angular-architects/module-federation-plugin)

---

**Happy coding! 🚀**
