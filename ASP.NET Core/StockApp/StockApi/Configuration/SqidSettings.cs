namespace StockApi.Configuration;

public class SqidSettings
{
    public required int HashSize { get; set; }

    public required string Alphabet { get; set; }

    public required string CommentsAlphabet { get; set; }
}
