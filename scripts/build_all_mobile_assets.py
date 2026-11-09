import cv2
import numpy as np

def build_brand_sheet_mobile():
    desk = cv2.imread('public/mustafa-canvas-brand-sheet.png')
    CANVAS_W = 1080
    
    # Header area (top left background + logo + wordmark)
    header_src = desk[0:465, 0:860]
    hh, hw, _ = header_src.shape
    new_hh = int(hh * (CANVAS_W / hw))
    header_resized = cv2.resize(header_src, (CANVAS_W, new_hh), interpolation=cv2.INTER_LANCZOS4)
    
    # 4 Trust badges (x=35..855, y=475..580)
    badges_src = desk[475:580, 35:855]
    hb, wb, _ = badges_src.shape
    new_wb = 980
    new_hb = int(hb * (new_wb / wb))
    badges_resized = cv2.resize(badges_src, (new_wb, new_hb), interpolation=cv2.INTER_LANCZOS4)
    badges_x = (CANVAS_W - new_wb) // 2
    
    # 5 Application cards
    cards_top = [
        desk[45:338, 866:1087],
        desk[45:338, 1097:1321],
        desk[45:338, 1333:1559],
        desk[45:338, 1568:1780],
        desk[45:338, 1790:2008],
    ]
    
    # 6 Product cards (including full labels)
    cards_mid = [
        desk[360:605, 866:1040],
        desk[360:605, 1055:1230],
        desk[360:605, 1248:1425],
        desk[360:605, 1442:1615],
        desk[360:605, 1635:1810],
        desk[360:605, 1828:2005],
    ]
    
    # Footers
    footer_contact_src = desk[615:765, 5:1045]
    footer_quality_src = desk[615:765, 1120:2028]
    
    COL_W = 310
    GAP_X = 25
    MARGIN_X = 50
    
    APP_H = 405
    PROD_H = 425
    
    y = 0
    header_y = y
    y += new_hh + 20
    
    badges_y = y
    y += new_hb + 45
    
    r1_y = y
    y += APP_H + 25
    
    r2_y = y
    r2_margin = (CANVAS_W - (2 * COL_W + GAP_X)) // 2
    y += APP_H + 50
    
    r3_y = y
    y += PROD_H + 25
    
    r4_y = y
    y += PROD_H + 45
    
    fc_y = y
    new_fch = 145
    y += new_fch
    
    fq_y = y
    new_fqh = 135
    y += new_fqh
    
    TOTAL_H = y
    
    canvas = np.ones((TOTAL_H, CANVAS_W, 3), dtype=np.uint8) * 255
    canvas[header_y:header_y+new_hh, 0:CANVAS_W] = header_resized
    canvas[badges_y:badges_y+new_hb, badges_x:badges_x+new_wb] = badges_resized
    
    for i in range(3):
        c = cv2.resize(cards_top[i], (COL_W, APP_H), interpolation=cv2.INTER_LANCZOS4)
        cx = MARGIN_X + i * (COL_W + GAP_X)
        canvas[r1_y:r1_y+APP_H, cx:cx+COL_W] = c
        
    for i in range(2):
        c = cv2.resize(cards_top[3 + i], (COL_W, APP_H), interpolation=cv2.INTER_LANCZOS4)
        cx = r2_margin + i * (COL_W + GAP_X)
        canvas[r2_y:r2_y+APP_H, cx:cx+COL_W] = c
        
    for i in range(3):
        c = cv2.resize(cards_mid[i], (COL_W, PROD_H), interpolation=cv2.INTER_LANCZOS4)
        cx = MARGIN_X + i * (COL_W + GAP_X)
        canvas[r3_y:r3_y+PROD_H, cx:cx+COL_W] = c
        
    for i in range(3):
        c = cv2.resize(cards_mid[3 + i], (COL_W, PROD_H), interpolation=cv2.INTER_LANCZOS4)
        cx = MARGIN_X + i * (COL_W + GAP_X)
        canvas[r4_y:r4_y+PROD_H, cx:cx+COL_W] = c
        
    fc_resized = cv2.resize(footer_contact_src, (CANVAS_W, new_fch), interpolation=cv2.INTER_LANCZOS4)
    canvas[fc_y:fc_y+new_fch, 0:CANVAS_W] = fc_resized
    
    fq_resized = cv2.resize(footer_quality_src, (CANVAS_W, new_fqh), interpolation=cv2.INTER_LANCZOS4)
    canvas[fq_y:fq_y+new_fqh, 0:CANVAS_W] = fq_resized
    
    cv2.imwrite('public/mustafa-canvas-brand-sheet-mobile.png', canvas)
    print(f'Successfully built brand-sheet-mobile: {CANVAS_W}x{TOTAL_H}')


def build_product_catalog_mobile():
    cat = cv2.imread('public/mustafa-canvas-product-catalog.png')
    desk = cv2.imread('public/mustafa-canvas-brand-sheet.png')
    CANVAS_W = 1080
    
    # Use consistent high-resolution header
    header_src = desk[0:465, 0:860]
    hh, hw, _ = header_src.shape
    new_hh = int(hh * (CANVAS_W / hw))
    header_resized = cv2.resize(header_src, (CANVAS_W, new_hh), interpolation=cv2.INTER_LANCZOS4)
    
    # 5 Application cards from desk
    cards_top = [
        desk[45:338, 866:1087],
        desk[45:338, 1097:1321],
        desk[45:338, 1333:1559],
        desk[45:338, 1568:1780],
        desk[45:338, 1790:2008],
    ]
    
    # 6 Product cards from desk
    cards_mid = [
        desk[360:605, 866:1040],
        desk[360:605, 1055:1230],
        desk[360:605, 1248:1425],
        desk[360:605, 1442:1615],
        desk[360:605, 1635:1810],
        desk[360:605, 1828:2005],
    ]
    
    # 4 Trust badges from catalog with clean descriptions (start from y=740 to avoid any stray text)
    badges_desc_src = cat[740:900, 40:1350]
    hbd, wbd, _ = badges_desc_src.shape
    new_wbd = 980
    new_hbd = int(hbd * (new_wbd / wbd))
    badges_desc_resized = cv2.resize(badges_desc_src, (new_wbd, new_hbd), interpolation=cv2.INTER_LANCZOS4)
    badges_desc_x = (CANVAS_W - new_wbd) // 2
    
    COL_W = 310
    GAP_X = 25
    MARGIN_X = 50
    
    APP_H = 405
    PROD_H = 425
    
    y = 0
    header_y = y
    y += new_hh + 35
    
    r1_y = y
    y += APP_H + 25
    
    r2_y = y
    r2_margin = (CANVAS_W - (2 * COL_W + GAP_X)) // 2
    y += APP_H + 50
    
    r3_y = y
    y += PROD_H + 25
    
    r4_y = y
    y += PROD_H + 50
    
    bd_y = y
    y += new_hbd + 60
    
    TOTAL_H = y
    
    canvas = np.ones((TOTAL_H, CANVAS_W, 3), dtype=np.uint8) * 255
    canvas[header_y:header_y+new_hh, 0:CANVAS_W] = header_resized
    
    for i in range(3):
        c = cv2.resize(cards_top[i], (COL_W, APP_H), interpolation=cv2.INTER_LANCZOS4)
        cx = MARGIN_X + i * (COL_W + GAP_X)
        canvas[r1_y:r1_y+APP_H, cx:cx+COL_W] = c
        
    for i in range(2):
        c = cv2.resize(cards_top[3 + i], (COL_W, APP_H), interpolation=cv2.INTER_LANCZOS4)
        cx = r2_margin + i * (COL_W + GAP_X)
        canvas[r2_y:r2_y+APP_H, cx:cx+COL_W] = c
        
    for i in range(3):
        c = cv2.resize(cards_mid[i], (COL_W, PROD_H), interpolation=cv2.INTER_LANCZOS4)
        cx = MARGIN_X + i * (COL_W + GAP_X)
        canvas[r3_y:r3_y+PROD_H, cx:cx+COL_W] = c
        
    for i in range(3):
        c = cv2.resize(cards_mid[3 + i], (COL_W, PROD_H), interpolation=cv2.INTER_LANCZOS4)
        cx = MARGIN_X + i * (COL_W + GAP_X)
        canvas[r4_y:r4_y+PROD_H, cx:cx+COL_W] = c
        
    canvas[bd_y:bd_y+new_hbd, badges_desc_x:badges_desc_x+new_wbd] = badges_desc_resized
    
    cv2.imwrite('public/mustafa-canvas-product-catalog-mobile.png', canvas)
    print(f'Successfully built product-catalog-mobile: {CANVAS_W}x{TOTAL_H}')


if __name__ == '__main__':
    build_brand_sheet_mobile()
    build_product_catalog_mobile()
