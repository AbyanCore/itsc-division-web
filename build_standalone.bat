rmdir /s /q .\.next && (
  npm run build && (
    mkdir .\.next\standalone\.next\static && (
      xcopy /s /e .\.next\static\* .\.next\standalone\.next\static\
    ) && mkdir .\.next\standalone\.next\public && (
      xcopy /s /e .\public\* .\.next\standalone\.next\public\
    )
  )
)