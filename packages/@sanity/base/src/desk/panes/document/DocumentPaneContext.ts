import {ValidationMarker, Path, SanityDocument} from '@sanity/types'
import {createContext} from 'react'
import {EditStateFor, TimelineController, Timeline} from '../../../datastores'
import {PatchEvent} from '../../../form'
import {DocumentActionComponent} from '../../actions'
import {DocumentBadgeComponent} from '../../badges'
import {PaneView, PaneMenuItem, PaneMenuItemGroup} from '../../types'
import {DocumentFormNode} from '../../../form/store/types/nodes'
import {TimelineMode} from './types'

export interface DocumentPaneContextValue {
  actions: DocumentActionComponent[] | null
  activeViewId: string | null
  badges: DocumentBadgeComponent[] | null
  changesOpen: boolean
  compareValue: Partial<SanityDocument> | null
  connectionState: 'connecting' | 'reconnecting' | 'connected'
  displayed: Partial<SanityDocument> | null
  documentId: string
  documentIdRaw: string
  documentSchema: any | null
  documentType: string
  editState: EditStateFor | null
  focusPath: Path
  historyController: TimelineController
  index: number
  inspectOpen: boolean
  menuItemGroups: PaneMenuItemGroup[]
  menuItems: PaneMenuItem[]
  onBlur: (blurredPath: Path) => void
  onChange: (event: PatchEvent) => void
  onFocus: (pathOrEvent: Path) => void
  onHistoryClose: () => void
  onHistoryOpen: () => void
  onInspectClose: () => void
  onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onMenuAction: (item: PaneMenuItem) => void
  onPaneClose: () => void
  onPaneSplit: () => void
  onPathOpen: (path: Path) => void
  onSetActiveFieldGroup: (path: Path, groupName: string) => void
  onSetCollapsedPath: (path: Path, expanded: boolean) => void
  onSetCollapsedFieldSet: (path: Path, expanded: boolean) => void
  paneKey: string
  previewUrl?: string | null
  ready: boolean
  setTimelineMode: (mode: TimelineMode) => void
  setTimelineRange(since: string | null, rev: string | null): void
  source?: string
  timeline: Timeline
  timelineMode: TimelineMode
  title: string | null
  validation: ValidationMarker[]
  value: Partial<SanityDocument>
  views: PaneView[]
  formState: DocumentFormNode | null
}

export const DocumentPaneContext = createContext<DocumentPaneContextValue | null>(null)