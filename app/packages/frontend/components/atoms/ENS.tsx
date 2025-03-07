import { Text } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'

export const ENS = ({ address }: { address: string }): JSX.Element => {
  const { library } = useEthers()
  const [ens, setEns] = useState<string | null>()

  useEffect(() => {
    let mounted = true
    if (address && library) {
      library
        ?.lookupAddress(address)
        .then((name) => {
          if (mounted) {
            setEns(name)
          }
        })
        .catch(() => setEns(null))
    }
    return () => {
      mounted = false
    }
  }, [address, library])

  return <Text fontFamily="mono">{ens || address}</Text>
}
