# LEC Student Search

Custom search engine for LEC students, powered by Google Programmable Search Engine (PSE).

## Setup

1. Go to [programmablesearchengine.google.com](https://programmablesearchengine.google.com/controlpanel/all)
2. Import `annotations.xml` (site list) and `context.xml` (facets) into your PSE
3. Copy your **Search Engine ID** (`cx=...`) from the PSE control panel
4. In `index.html`, replace `YOUR_CX_ID` with your actual engine ID:
   ```html
   <script async src="https://cse.google.com/cse.js?cx=YOUR_CX_ID"></script>
   ```

## Files

| File | Purpose |
|------|---------|
| `index.html` | The search page students see |
| `annotations.xml` | Site list — which domains are allowed and their subject tags |
| `context.xml` | Facets (subject tabs) and filter mode configuration |

## Adding Sites

Edit `annotations.xml`. Each entry looks like:

```xml
<Annotation about="example.com/*">
  <Label name="_include_"/>
  <Label name="science"/>   <!-- optional subject tag for the Science tab -->
</Annotation>
```

Subject labels: `reference`, `math`, `science`, `history`, `language_arts`

Upload the updated `annotations.xml` to the PSE control panel after changes.

## Chrome Policy

Set `chrome.users.DefaultSearchProviderSearchUrl` to:
```
https://your-deployed-url.com/?q={searchTerms}
```

Apply to OU: `/Students/user_and_browser_baseline` in Google Admin Console.
