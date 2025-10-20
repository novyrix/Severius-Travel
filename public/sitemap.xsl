<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Severius Adventures & Travel - XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #4E342E 0%, #8B6F47 50%, #D4AF37 100%);
            color: #333;
            line-height: 1.6;
            padding: 2rem 1rem;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
          }
          
          header {
            background: linear-gradient(135deg, #4E342E 0%, #8B6F47 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
          }
          
          header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          }
          
          header p {
            font-size: 1.1rem;
            opacity: 0.95;
            margin-bottom: 1rem;
          }
          
          header a {
            display: inline-block;
            background: #D4AF37;
            color: #4E342E;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
            transition: all 0.3s ease;
          }
          
          header a:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
          }
          
          .info-box {
            background: #FFF9E6;
            border-left: 4px solid #D4AF37;
            padding: 1.5rem 2rem;
            margin: 2rem;
            border-radius: 8px;
          }
          
          .info-box h2 {
            color: #4E342E;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
          }
          
          .info-box p {
            color: #666;
            margin-bottom: 0.5rem;
          }
          
          .stats {
            display: flex;
            justify-content: space-around;
            padding: 2rem;
            background: #F5F5F5;
            border-bottom: 1px solid #E0E0E0;
          }
          
          .stat {
            text-align: center;
          }
          
          .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #D4AF37;
            display: block;
          }
          
          .stat-label {
            font-size: 0.9rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          thead {
            background: #4E342E;
            color: white;
          }
          
          th {
            padding: 1rem 1.5rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          tbody tr {
            border-bottom: 1px solid #E0E0E0;
            transition: background 0.2s ease;
          }
          
          tbody tr:hover {
            background: #FFF9E6;
          }
          
          tbody tr:last-child {
            border-bottom: none;
          }
          
          td {
            padding: 1rem 1.5rem;
          }
          
          td.url {
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
          }
          
          td.url a {
            color: #2563EB;
            text-decoration: none;
            word-break: break-all;
          }
          
          td.url a:hover {
            text-decoration: underline;
            color: #D4AF37;
          }
          
          td.priority,
          td.changefreq {
            color: #666;
            font-size: 0.9rem;
          }
          
          td.lastmod {
            color: #999;
            font-size: 0.85rem;
            white-space: nowrap;
          }
          
          .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
          }
          
          .badge-high {
            background: #D4AF37;
            color: white;
          }
          
          .badge-medium {
            background: #FFC107;
            color: #4E342E;
          }
          
          .badge-low {
            background: #E0E0E0;
            color: #666;
          }
          
          footer {
            background: #4E342E;
            color: white;
            padding: 2rem;
            text-align: center;
            font-size: 0.9rem;
          }
          
          footer a {
            color: #D4AF37;
            text-decoration: none;
          }
          
          footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            header h1 {
              font-size: 1.8rem;
            }
            
            .stats {
              flex-direction: column;
              gap: 1.5rem;
            }
            
            table {
              font-size: 0.85rem;
            }
            
            th, td {
              padding: 0.75rem 0.5rem;
            }
            
            .info-box {
              margin: 1rem;
              padding: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>🌍 XML Sitemap</h1>
            <p>Severius Adventures & Travel</p>
            <p style="font-size: 0.95rem; opacity: 0.9;">Authentic African Safari & Adventure Tours</p>
            <a href="https://severiusadventuresandtravel.com">Visit Website →</a>
          </header>
          
          <div class="stats">
            <div class="stat">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              <span class="stat-label">Total URLs</span>
            </div>
            <div class="stat">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='1.0' or sitemap:priority='0.9'])"/></span>
              <span class="stat-label">High Priority</span>
            </div>
            <div class="stat">
              <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority='0.8' or sitemap:priority='0.7'])"/></span>
              <span class="stat-label">Medium Priority</span>
            </div>
          </div>
          
          <div class="info-box">
            <h2>About This Sitemap</h2>
            <p>This XML Sitemap helps search engines like Google discover and index all pages on our website.</p>
            <p><strong>Last Generated:</strong> <xsl:value-of select="current-dateTime()"/></p>
            <p><strong>Format:</strong> XML Sitemap Protocol 0.9</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">URL</th>
                <th style="width: 15%;">Priority</th>
                <th style="width: 20%;">Change Frequency</th>
                <th style="width: 15%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td class="url">
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="priority">
                    <xsl:choose>
                      <xsl:when test="sitemap:priority='1.0' or sitemap:priority='0.9'">
                        <span class="badge badge-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority='0.8' or sitemap:priority='0.7'">
                        <span class="badge badge-medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge badge-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="changefreq">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <footer>
            <p>© 2025 Severius Adventures & Travel. All rights reserved.</p>
            <p style="margin-top: 0.5rem;">
              <a href="https://severiusadventuresandtravel.com">Home</a> • 
              <a href="https://severiusadventuresandtravel.com/about">About</a> • 
              <a href="https://severiusadventuresandtravel.com/tours">Tours</a> • 
              <a href="https://severiusadventuresandtravel.com/contact">Contact</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
