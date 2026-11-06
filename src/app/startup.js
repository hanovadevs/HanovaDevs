/** Leave the prerendered homepage untouched until its code and CSS are ready. */
export async function mountWhenHomeReady({ pathname, mount, loadHome = () => import('../pages/home/Home.jsx') }) {
  const initialHome = pathname === '/' ? (await loadHome()).default : null
  mount(initialHome)
}
