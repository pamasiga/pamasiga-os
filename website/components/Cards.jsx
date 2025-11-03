import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

/**
 * Card Component for feature highlights
 */
export function Card({ title, description, icon, href, external = false }) {
  const CardContent = () => (
    <div className="group relative p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg">
      {icon && (
        <div className="mb-4 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
        {href && (
          <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
            {external ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
          </span>
        )}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </div>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          <CardContent />
        </a>
      )
    }
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

/**
 * Cards Grid Container
 */
export function Cards({ children, cols = 3 }) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[cols]} gap-4 my-6`}>
      {children}
    </div>
  )
}

/**
 * Feature Card with Icon
 */
export function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}

export default Cards
