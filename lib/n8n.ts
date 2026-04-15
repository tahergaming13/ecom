export const triggerN8nWorkflow = async (workflowUrl: string, data: any) => {
    try {
        const response = await fetch(workflowUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(process.env.N8N_API_KEY && {
                    'Authorization': `Bearer ${process.env.N8N_API_KEY}`
                })
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`n8n workflow failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('n8n error:', error);
        throw error;
    }
}
