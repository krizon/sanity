/* eslint-disable react/jsx-handler-names */
import {Card, Stack, Text} from '@sanity/ui'
import React, {useCallback} from 'react'
import {ArraySortableItem, ArraySortableList} from '../../common/arraySortableList'
import {ArrayOfObjectsInputProps, ObjectItem, ObjectItemProps} from '../../../../types'
import {DefaultArrayInputFunctions} from '../../common/ArrayFunctions'
import {ArrayOfObjectsItem} from '../../../../members'
import {createProtoArrayValue} from '../createProtoArrayValue'
import {UploadTargetCard} from '../../common/UploadTargetCard'
import {useArrayFunctionHandlers} from '../useArrayFunctionHandlers'
import {GridItem} from './GridItem'
import {GridErrorItem} from './GridErrorItem'

const EMPTY: [] = []

export function GridArrayInput<Item extends ObjectItem>(props: ArrayOfObjectsInputProps<Item>) {
  const {
    schemaType,
    onChange,
    value = EMPTY,
    readOnly,
    members,
    elementProps,
    resolveUploader,
    onItemMove,
    onUpload,
    renderPreview,
    renderField,
    renderInput,
  } = props

  const {handlePrepend, handleAppend} = useArrayFunctionHandlers(props)

  const sortable = schemaType.options?.sortable !== false

  const renderItem = useCallback((itemProps: Omit<ObjectItemProps, 'renderDefault'>) => {
    // todo: consider using a different item component for references
    return <GridItem {...itemProps} />
  }, [])

  return (
    <Stack space={3}>
      <UploadTargetCard
        types={schemaType.of}
        resolveUploader={resolveUploader}
        onUpload={onUpload}
        {...elementProps}
        tabIndex={0}
      >
        <Stack data-ui="ArrayInput__content" space={3}>
          {members?.length === 0 ? (
            <Card padding={3} border style={{borderStyle: 'dashed'}} radius={2}>
              <Text align="center" muted size={1}>
                {schemaType.placeholder || <>No items</>}
              </Text>
            </Card>
          ) : (
            <Card border radius={1}>
              <ArraySortableList
                axis="xy"
                lockAxis="xy"
                columns={[2, 3, 4]}
                gap={3}
                padding={1}
                margin={1}
                onItemMove={onItemMove}
                sortable={sortable}
              >
                {members.map((member, index) => (
                  <ArraySortableItem key={member.key} sortable={sortable} index={index} flex={1}>
                    {member.kind === 'item' && (
                      <ArrayOfObjectsItem
                        member={member}
                        renderItem={renderItem}
                        renderField={renderField}
                        renderInput={renderInput}
                        renderPreview={renderPreview}
                      />
                    )}
                    {member.kind === 'error' && (
                      <GridErrorItem sortable={sortable} member={member} />
                    )}
                  </ArraySortableItem>
                ))}
              </ArraySortableList>
            </Card>
          )}
        </Stack>
      </UploadTargetCard>

      <DefaultArrayInputFunctions
        type={schemaType}
        value={value}
        readOnly={readOnly}
        onItemAppend={handleAppend}
        onItemPrepend={handlePrepend}
        onValueCreate={createProtoArrayValue}
        onChange={onChange}
      />
    </Stack>
  )
}