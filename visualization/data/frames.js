const frames = [
  {
    template: "title",
    title: "40 acres and a mule",
    subtitle: "A promise to black families left unkempt.",
    attribution: "A data story by Sub, Maddy, Pearl, and Sayuj",
    image: "assets/frame1.png"
  },
  {
    template: "split",
    image: "assets/frame2.png",
    title: "What is the 40 acres and a mule promise?",
    subtitle:
      "Wartime Order No. 15 was proclaimed by Union general William Sherman in 1865 during the American Civil War, to allot 400,000 acres to 18,000 formerly enslaved families in parcels of at most 40 acres of land. This land was across Georgia, South Carolina, and Florida. The promise was reversed by President Johnson. For many newly freed families, land represented more than property. It was the foundation for economic independence, a source of generational wealth, and a symbol of freedom and self-sufficiency. The failure to fulfill this promise had profound implications for the economic trajectories of Black families in the United States, contributing to persistent wealth gaps and systemic inequalities that continue to this day., something that was systematically denied under slavery. ",
    body: "400,000 acres is 1.3x larger than the city of Los Angeles."
  },
  {
    template: "split",
    title: "The Current Situation",
    image: "assets/present_day.png",
    body: "In 2022, Black families made about 15 cents for every dollar a White family earned. Wealth is different from income. While income supports daily living, wealth includes assets such as homes, land, and investments that grow over time and can be passed across generations. This wage gap is indicative of long-standing barriers to asset ownership and generational wealth."
  },
  {
    template: "card",
    title: "What if this 40 acre promise was kept to Black families?",
    body: "We model 18,000 Black families and 18,000 white families in South Carolina over time, tracking their respective wealth trajectories under a “40 acres and a mule” scenario compared to what actually occurred in history. In the simulation, each Black family begins with ownership of 40 acres of land, which can be farmed, sold, or passed down to future generations. Over time, wealth grows through income, savings, investments, and asset appreciation.The model also incorporates major historical events such as the Great Migration, the Tulsa Race Massacre, the Great Depression, post-war economic expansion, and the 2008 financial crisis. These events influence income opportunities, investment returns, and economic shocks that shape wealth over time. This raises an important question: <i>how much of today's wealth gap might have been different if formerly enslaved families had received land in 1865?</i>"
  },
  {
    template: "card",
    title: "1865",
    statsYear: 1865,
    subtitle: "What actually happened",
    body: `
    <p><u>Reconstruction policies</u>: After the Civil War, newly freed people briefly gained political representation and some economic opportunities during Reconstruction. However, large-scale land redistribution largely failed, leaving most Black families without property.</p>

    <p><u>Rise of sharecropping</u>: Without land ownership, many Black families entered sharecropping agreements with white landowners. These contracts often trapped families in cycles of debt, where crop profits went toward repaying loans and supplies.</p>
    
    <p>Because land and capital were scarce, Black wages remained extremely low and unstable. Without assets to invest or pass down to future generations, wealth accumulation was nearly impossible, and the racial wealth gap solidified.</p>
    `
  },
  {
    template: "card",
    image: "assets/frame7.png",
    subtitle: "Our Simulation",
    body: `  
    <p>In our scenario, land ownership prevents dependence on sharecropping. Early wealth accumulation begins, and the Black wealth line rises as families are able to generate income directly from the land they own.</p>

    <p>Land also functions as an asset that can appreciate in value over time. Families can sell crops, build savings, and potentially pass property down to their children, allowing wealth to grow across generations.</p>
    
    <p>However, even in this scenario Black families do not start on equal footing. Although Black families are starting off with 40 acres, the average white family at this time often started off with significantly more land. White families were the main beneficiaries of policies such as the Homestead Act of 1862, which granted up to 160 acres of public land to settlers.</p>

    <p>This early difference in assets begins to shape how wealth grows over the following decades.</p>
    `
  },
  {
    template: "card",
    image: "assets/frame8.png",
    statsYear: 1880,
    showStats: true,
    body: `<p class="model-stats-loading">Loading simulation statistics...</p>`,
    wage: 1
  },
  {
    template: "card",
    title: "1910s-20s",
    statsYear: 1910,
    body: `
<p>As the United States industrialized in the early 20th century, economic opportunities for Black families began to shift.</p>

<p><u>Great Migration</u>: Over 6 million Black Americans moved from the rural South to cities in the North and West seeking industrial jobs and higher wages. This migration opened new economic opportunities outside of agricultural labor and allowed some families to earn more stable incomes.</p>

<p><u>Tulsa Race Massacre and racial violence</u>: The Tulsa Race Massacre occurred in June 1921, when mobs of white supremacist terrorists attacked Black residents of Tulsa, Oklahoma, destroying homes and businesses in the wealthiest Black community in the United States at the time. This massacre was a direct attack on Black wealth and economic independence. Our simulation accounts for the fact that Black families were more likely to experience economic shocks and systematic wealth destruction like these than white families.</p>

<p>Black wages rose modestly due to industrial work, but wealth remained fragile and vulnerable to racial violence, discrimination, and limited access to capital. As a result, the gap narrowed slightly.</p>
`
  },
  {
    template: "card",
    image: "assets/frame11.png",
    subtitle: "Our Simulation",
    body: `
    <p>In our scenario, families with inherited land capital have the financial resources to invest in businesses, take out loans, and rebuild more easily after economic shocks or violence.</p>

    <p>Because land can be used as collateral and passed down across generations, it provides a financial buffer that helps families recover from setbacks and continue accumulating assets.</p>
  
    <p>As a result, the wealth line in the simulation rises more quickly and remains less fragile over time, since families are able to reinvest earnings and maintain ownership of appreciating assets.</p>
   `
  },
  {
    template: "card",
    image: "assets/frame12.png",
    statsYear: 1920,
    showStats: true,
    body: `<p class="model-stats-loading">Loading simulation statistics...</p>`,
    wage: 1
  },
  {
    template: "card",
    title: "1930s-40s",
    body: `
    <p><u>Great Depression</u>: The collapse of agricultural prices and massive unemployment hit Black workers especially hard because they were overrepresented in low-wage farm and service jobs and were often the last hired and first fired.</p>

    <p><u>New Deal exclusions</u>: Many New Deal programs, including early Social Security and labor protections, excluded agricultural and domestic workers-jobs where Black Americans were heavily overrepresented. This limited their access to unemployment insurance, pensions, and long term wage protections.</p>
    
    <p><u>Postwar housing boom</u>: After World War II, federally backed mortgages fueled a massive suburban housing boom, which became one of the main engines of middle-class wealth in America. However, redlining and discriminatory lending practices largely shut Black families out of these appreciating neighborhoods, preventing them from building housing wealth.</p>
    
    <p>White wages dropped sharply during the early years of the Great Depression around 1929-1933 but began recovering by the late 1930s. Black wages fell even more sharply and recovered more slowly, widening the economic gap.</p>
    
    <p>As a result, wealth accumulation during this period increasingly depended on access to stable employment, government programs, and housing assets—advantages that many Black families were systematically denied.</p>
    `
  },
  {
    template: "card",
    image: "assets/frame16.png",
    statsYear: 1940,
    showStats: true,
    body: `<p class="model-stats-loading">Loading simulation statistics...</p>`
  },
  {
    template: "card",
    title: "1950s-60s",
    body: `
    <p><u>Emmett Louis Till</u>: (July 25, 1941 - August 28, 1955) was an African-American boy who, at 14 years old, was abducted and lynched in Mississippi in 1955 after being accused of offending a white woman. His lynching exposed the violent enforcement of white supremacy, reinforcing a climate of fear and economic insecurity that restricted mobility, business development, and investment in Black communities.</p>

    <p><u>Brown v. Board of Education (1954)</u>: This Supreme Court decision ruled school segregation unconstitutional, but implementation was slow and heavily resisted in the South. As a result, improvements in education quality and long term earning opportunities for Black families occurred gradually rather than immediately.</p>
    
    <p>During the postwar decades, white wealth followed a steady upward trend driven by postwar prosperity, manufacturing growth, and suburban expansion. Black wealth also increased, but at a slower pace and remained clearly below those of white workers.</p>
    
    <p>At the same time, rising home values in suburban neighborhoods allowed many white families to accumulate wealth through housing appreciation. Because discriminatory lending and housing policies limited Black access to these neighborhoods, the wealth gap remained large.</p>
    `
  },
  {
    template: "card",
    image: "assets/frame20.png",
    statsYear: 1960,
    showStats: true,
    body: `<p class="model-stats-loading">Loading simulation statistics...</p>`
  },
  {
    template: "card",
    title: "1970s-80s",
    body: `
    <p><u>Manufacturing decline</u>: Factory jobs began disappearing across the United States, especially in urban areas where many Black workers were concentrated. As factories closed or moved overseas, stable middle-class employment opportunities declined.</p>

    <p><u>Rise of financialization</u>: Economic growth increasingly shifted toward finance and service industries, which tended to favor households that already held financial assets rather than those relying primarily on wages.</p>
    
    <p>As a result, Black wealth and wages declined more sharply due to industrial job loss, and unemployment often lasted longer. The wage gap widened, and without access to appreciating assets like stocks or housing in growing markets, wealth stagnated in many communities.</p>
    `
  },
  {
    template: "card",
    image: "assets/frame23.png",
    subtitle: "Our Simulation",
    body: `
    <p>At this point in time, Black families who received the 40-acre land grant are at roughly the same net worth as Black families who did not receive the grant.</p>

    <p>Although the initial land ownership provided an early advantage, many of the structural barriers affecting Black families—such as lower wages, limited access to credit, discriminatory housing policies, and economic shocks—continued to influence wealth accumulation over time.</p>
  
    <p>As these forces compound across generations, the early benefits of the land grant begin to fade. Without broader changes to income opportunities, savings access, and asset security, a single early asset is not enough to completely transform long term wealth outcomes.</p>
    `
  },
  {
    template: "card",
    title: "2000s",
    statsYear: 2000,
    body: `
    <p><u>Subprime lending disparities</u>: Black homeowners were disproportionately targeted with high-risk mortgages and subprime loans, often receiving worse terms even when they qualified for conventional loans.</p>

    <p><u>2008 Housing Crash</u>: When the housing market collapsed in 2008, massive home equity losses hit Black households especially hard. Because housing represented a large share of household wealth, the crash erased significant portions of accumulated assets in many Black communities.</p>
    
    <p>As a result, the financial crisis reversed years of progress and widened existing wealth disparities, leaving many families with fewer assets to pass down to future generations.</p>
`
  },
  {
    template: "card",
    title: "Present Day (2000 - 2026)",
    body: `
    <p>Giving every Black family 40 acres of land might have helped bridge some wealth gaps and improve access to economic opportunity in the early years after emancipation. However, it would not have been enough to eliminate the deeply rooted barriers to economic success.</p>

    <p>Large-scale economic shocks, similar to the destruction of Greenwood during the Tulsa Race Massacre — which destroyed what was often called “Black Wall Street” — have repeatedly wiped out generations of accumulated wealth in a matter of days.</p>
    
    <p>These events highlight how vulnerable wealth accumulation can be when families lack the institutional protections and financial resources that allow assets to recover and grow.</p>
    `
  },
  {
    template: "card",
    body: `<p>Beyond outright violence, systemic barriers continued to limit economic mobility across generations.</p>

    <p>Discriminatory practices like redlining restricted where Black families could live and invest, cutting them off from appreciating property values and access to credit.</p>
    
    <p>Limited access to traditional banking, exclusion from investment markets, employment discrimination, and unequal educational opportunities further compounded these disadvantages over time.</p>
    
    <p>Together, these forces shaped how wealth accumulated across generations, helping explain why the racial wealth gap persists today.</p>
    `
  },

  //after this, hide the chart again to focus on the conclusions - so whole chart should have been completed by now

  {
    template: "card",
    hideViz: true,
    body: `
    <p>Together, these factors illustrate that while land redistribution could have provided an important economic foundation, structural racism embedded in financial, legal, and social systems would still have posed significant obstacles to long term economic equity.</p>

    <p>Even with an initial land grant, many of the barriers that shaped wealth accumulation in the United States would likely have continued to influence outcomes across generations.</p>
    `
  },

  {
    template: "card",
    hideViz: true,
    title: "But what if we removed some of these barriers?"
  },

  {
    template: "card",
    subtitle:
      "What if systematic theft events such as the Tulsa Race Massacre did not happen to Black families? ",
    body: `
    <p>Events similar to the Tulsa Race Massacre occurred across the United States and often resulted in the destruction of Black wealth and communities.</p>

    <p>The Wilmington Massacre of 1898 in North Carolina, the Atlanta Race Massacre of 1906 in Georgia, the Elaine Massacre in Arkansas, and the Rosewood Massacre in Florida involved violent attacks on Black residents that destroyed homes, businesses, and local institutions.</p>
    
    <p>These events forced many Black families to flee their communities, leading to the loss of land, property, and long term economic opportunity.</p>
    
    <p>In our next experiment, we explore how wealth trajectories might change if these large-scale wealth destruction events had not occurred.</p>
    `
  },
  {
    template: "toggle",
    factorKey: "TE",
    title:
      "What if systematic theft events such as the Tulsa Race Massacre did not happen to Black families?",
    toggleOptionA: "Theft Equality",
    toggleOptionB: "Actual (with theft events)"
  },
  {
    template: "toggle",
    factorKey: "SE",
    title:
      "How would wealth outcomes change if Black families had the same savings rate as white families and equal inclusion in Social Security?",
    toggleOptionA: "Savings Equality",
    toggleOptionB: "Actual"
  },
  {
    template: "toggle",
    factorKey: "IE",
    title:
      "What if Black families took home the same amount of income as white families?",
    toggleOptionA: "Income Equality",
    toggleOptionB: "Actual"
  },
  {
    template: "card",
    datasetToggle: true,
    subtitle: "Explore how removing barriers changes the wealth trajectory",
    body: "Use the controls below the chart to explore how different structural barriers influence long term wealth outcomes."
  }
];
