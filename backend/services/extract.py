# Content Extraction Services
from typing import Optional
from firecrawl import FirecrawlApp

class FirecrawlExtractor:
    def __init__(self, api_url: str = 'http://localhost:3002', api_key: str = 'null') -> None:
        self.firecrawl_app = FirecrawlApp(api_key=api_key, api_url=api_url)

    # Scrape user provided URL using Firecrawl
    def extract_markdown_from_url(self, url: str) -> Optional[dict]:
        try:
            scrape_result = self.firecrawl_app.scrape_url(
                url,
                {
                    "formats": ["markdown"],
                    "onlyMainContent": False,
                    "waitFor": 5,
                    "timeout": 30000,
                    "removeBase64Images": True,
                    "blockAds": True,
                }
            )

            if scrape_result.get("metadata", {}).get("statusCode") == 200:
                return scrape_result
            
            else:
                print(f"Firecrawl returned non-200 status for URL: {url}")
                return None
            
        except Exception as e:
            print(f"Exception while scraping {url}: {e}")
            return None

# Wrapper function to extract content from URL
def extract_md_from_url(url: str, api_url: Optional[str] = None, api_key: Optional[str] = None) -> Optional[dict]:
    extractor = FirecrawlExtractor(api_url or 'http://localhost:3002', api_key or 'null')
    return extractor.extract_markdown_from_url(url)