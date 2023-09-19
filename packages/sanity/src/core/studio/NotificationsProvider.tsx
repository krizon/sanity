import {KnockFeedProvider} from '@knocklabs/react-notification-feed'
import React from 'react'
import {useCurrentUser} from '../store'

// eslint-disable-next-line no-process-env
const KNOCK_PUBLIC_API_KEY = process.env.SANITY_STUDIO_DEBUG_KNOCK_PUBLIC_API_KEY
// eslint-disable-next-line no-process-env
const KNOCK_FEED_CHANNEL_ID = process.env.SANITY_STUDIO_DEBUG_KNOCK_FEED_CHANNEL_ID

interface NotificationProviderProps {
  children: React.ReactElement
}

export function NotificationsProvider({children}: NotificationProviderProps) {
  const currentUser = useCurrentUser()

  if (!currentUser?.id || !KNOCK_PUBLIC_API_KEY || !KNOCK_FEED_CHANNEL_ID) {
    return children
  }

  return (
    <KnockFeedProvider
      apiKey={KNOCK_PUBLIC_API_KEY}
      feedId={KNOCK_FEED_CHANNEL_ID}
      rootless
      userId={currentUser.id}
    >
      {children}
    </KnockFeedProvider>
  )
}
