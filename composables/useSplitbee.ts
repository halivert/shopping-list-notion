export const useSplitbee = () => {
  const { production } = useRuntimeConfig()

  useHead({
    script: [
      ...(production
        ? [{ async: true, src: "https://cdn.splitbee.io/sb.js" }]
        : []),
    ],
  })
}
